'use client';

import { useState } from 'react';
import { PLANS } from '@/lib/plans';
import { Calculator } from 'lucide-react';

const MONTHS = [1, 3, 6, 12];

export default function CostCalculator() {
  const [planIdx, setPlanIdx] = useState(1);
  const [months, setMonths] = useState(12);

  const plan = PLANS[planIdx];
  const monthlyPrice = Number(plan.price.replace(',', ''));

  const DISCOUNTS: Record<number, number> = { 1: 0, 3: 0.03, 6: 0.05, 12: 0.10 };
  const discount = DISCOUNTS[months] ?? 0;
  const total = Math.round(monthlyPrice * months * (1 - discount));
  const saved = Math.round(monthlyPrice * months * discount);

  return (
    <div className="rounded-3xl border p-8" style={{ border: '1px solid var(--border)', backgroundColor: '#fff', boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center gap-2 mb-2">
        <Calculator size={18} style={{ color: 'var(--green)' }} />
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--green)' }}>Cost Calculator</span>
      </div>
      <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--black)' }}>Calculate your cost</h3>

      <div className="mb-5">
        <label className="block text-xs font-medium mb-2" style={{ color: 'var(--gray-600)' }}>Select Plan</label>
        <div className="space-y-2">
          {PLANS.map((p, i) => (
            <button key={i} onClick={() => setPlanIdx(i)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm transition-all"
              style={{
                border: planIdx === i ? '2px solid var(--green)' : '1px solid var(--border-md)',
                backgroundColor: planIdx === i ? 'var(--green-50)' : '#fff',
                color: 'var(--black)',
              }}>
              <span className="font-medium">{p.name} — {p.speed} {p.unit}</span>
              <span className="font-mono font-bold" style={{ color: planIdx === i ? 'var(--green)' : 'var(--gray-500)' }}>NPR {p.price}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium mb-2" style={{ color: 'var(--gray-600)' }}>Duration</label>
        <div className="grid grid-cols-4 gap-2">
          {MONTHS.map(m => (
            <button key={m} onClick={() => setMonths(m)}
              className="py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                backgroundColor: months === m ? 'var(--green)' : 'var(--gray-100)',
                color: months === m ? 'var(--black)' : 'var(--gray-500)',
              }}>
              {m}mo
            </button>
          ))}
        </div>
        {discount > 0 && <p className="text-xs mt-2" style={{ color: 'var(--green-700)' }}>🎉 {discount * 100}% discount applied for longer term</p>}
      </div>

      <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--green-50)', border: '1px solid var(--green)' }}>
        <div className="flex justify-between text-sm mb-1" style={{ color: 'var(--gray-600)' }}>
          <span>Monthly price</span>
          <span className="font-mono font-semibold">NPR {plan.price}</span>
        </div>
        <div className="flex justify-between text-sm mb-3" style={{ color: 'var(--gray-600)' }}>
          <span>Duration</span>
          <span className="font-mono font-semibold">{months} months</span>
        </div>
        {saved > 0 && (
          <div className="flex justify-between text-sm mb-3" style={{ color: 'var(--green-700)' }}>
            <span>You save</span>
            <span className="font-mono font-semibold">NPR {saved.toLocaleString()}</span>
          </div>
        )}
        <div className="border-t pt-3 flex justify-between" style={{ borderColor: 'var(--green)' }}>
          <span className="font-bold" style={{ color: 'var(--black)' }}>Total</span>
          <span className="text-2xl font-bold font-mono" style={{ color: 'var(--green)' }}>NPR {total.toLocaleString()}</span>
        </div>
      </div>

      <a href="/contact"
        className="block w-full text-center mt-4 py-3 rounded-2xl font-bold text-sm"
        style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
        Get This Plan
      </a>
    </div>
  );
}
