'use client';

import { useRef, useState, type FormEvent } from 'react';
import { usePlan } from '@/context/PlanContext';
import { PROPERTY_NAME, SCOPE_NAME, formatArea } from '@/lib/planner';
import type { PropertyType, Scope, Term } from '@/types';

const inputClass =
  'w-full rounded-md border-[1.5px] border-line bg-white px-3 py-2.5 text-ink focus-visible:border-chill focus-visible:outline-3 focus-visible:outline-chill focus-visible:outline-offset-0';

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold">{label}</label>
      {children}
    </div>
  );
}

type Status = { kind: 'idle' } | { kind: 'ok' | 'err'; text: string };

export function QuoteForm() {
  const { plan, update, requested, setRequested } = usePlan();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: 'idle' });
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus({ kind: 'err', text: 'Fill in your name, company, work email and property type.' });
      return;
    }
    setSending(true);
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'The request failed. Try again in a moment.');
      setStatus({ kind: 'ok', text: 'Quote request sent. We will reply within one business day.' });
      form.reset();
      setRequested(false);
    } catch (err) {
      setStatus({ kind: 'err', text: err instanceof Error ? err.message : 'The request failed. Try again in a moment.' });
    } finally {
      setSending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-4 rounded-[10px] bg-white p-[18px] sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor="f-name"><input id="f-name" name="name" autoComplete="name" required maxLength={120} className={inputClass} /></Field>
        <Field label="Company" htmlFor="f-company"><input id="f-company" name="company" autoComplete="organization" required maxLength={160} className={inputClass} /></Field>
        <Field label="Work email" htmlFor="f-email"><input id="f-email" name="email" type="email" autoComplete="email" required className={inputClass} /></Field>
        <Field label="Phone" htmlFor="f-phone"><input id="f-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} className={inputClass} /></Field>
        <Field label="Property type" htmlFor="f-prop">
          <select id="f-prop" name="propertyType" required value={plan.propertyType} onChange={(e) => update({ propertyType: e.target.value as PropertyType })} className={inputClass}>
            <option value="shopping-center">Shopping center</option>
            <option value="office-complex">Office complex</option>
            <option value="factory">Factory</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Floor area (sq ft)" htmlFor="f-area">
          <input id="f-area" name="floorAreaSqFt" type="number" min={0} inputMode="numeric" value={plan.area || ''} onChange={(e) => update({ area: Number(e.target.value) })} className={inputClass} />
        </Field>
        <Field label="Scope" htmlFor="f-int">
          <select id="f-int" name="interest" value={plan.scope} onChange={(e) => update({ scope: e.target.value as Scope })} className={inputClass}>
            <option value="maintenance">Maintenance</option>
            <option value="replacement">Replacement</option>
            <option value="both">Maintenance and replacement</option>
          </select>
        </Field>
        <Field label="Contract term" htmlFor="f-term">
          <select id="f-term" name="preferredTermYears" value={plan.term} onChange={(e) => update({ term: Number(e.target.value) as Term })} className={inputClass}>
            <option value={1}>1 year</option>
            <option value={3}>3 years</option>
            <option value={5}>5 years</option>
            <option value={10}>10 years</option>
          </select>
        </Field>
      </div>

      <Field label="Notes about your equipment or site" htmlFor="f-msg">
        <textarea id="f-msg" name="message" rows={4} maxLength={2000} className={inputClass} />
      </Field>

      {requested && (
        <p className="border-l-4 border-flame bg-mist px-3.5 py-2.5 text-sm font-semibold">
          Your plan: {PROPERTY_NAME[plan.propertyType]}, {formatArea(plan.area)}, {plan.term}-year {SCOPE_NAME[plan.scope].toLowerCase()} contract
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="rounded-md bg-flame px-6 py-3.5 font-bold text-white transition-colors hover:bg-flame-deep disabled:opacity-60"
      >
        {sending ? 'Sending…' : 'Send quote request'}
      </button>
      <p role="status" aria-live="polite" className={`min-h-6 font-semibold ${status.kind === 'ok' ? 'text-[#1b6f3a]' : status.kind === 'err' ? 'text-[#b3261e]' : ''}`}>
        {status.kind === 'idle' ? '' : status.text}
      </p>
    </form>
  );
}
