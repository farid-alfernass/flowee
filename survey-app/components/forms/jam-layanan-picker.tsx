'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JamLayananValue {
  hari: string[]       // e.g. ['Senin','Selasa','Rabu','Kamis','Jumat']
  jamBuka: string      // e.g. '08:00'
  jamTutup: string     // e.g. '20:00'
}

interface JamLayananPickerProps {
  value?: JamLayananValue
  onChange: (value: JamLayananValue) => void
  disabled?: boolean
}

// ─── Constants ────────────────────────────────────────────────────────────────

const HARI_LIST = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
  'Minggu',
]

// Generate time options every 30 minutes: 00:00 – 23:30
const TIME_OPTIONS: string[] = []
for (let h = 0; h < 24; h++) {
  for (const m of [0, 30]) {
    TIME_OPTIONS.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
  }
}

// Preset shortcuts
const PRESETS: { label: string; value: JamLayananValue }[] = [
  {
    label: 'Senin–Jumat (08:00–17:00)',
    value: { hari: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'], jamBuka: '08:00', jamTutup: '17:00' },
  },
  {
    label: 'Senin–Sabtu (08:00–20:00)',
    value: { hari: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'], jamBuka: '08:00', jamTutup: '20:00' },
  },
  {
    label: 'Setiap Hari (08:00–21:00)',
    value: { hari: [...HARI_LIST], jamBuka: '08:00', jamTutup: '21:00' },
  },
  {
    label: 'Setiap Hari (09:00–22:00)',
    value: { hari: [...HARI_LIST], jamBuka: '09:00', jamTutup: '22:00' },
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Compress consecutive days into a range label, e.g. ['Senin','Selasa','Rabu'] → 'Senin–Rabu' */
function formatHari(hari: string[]): string {
  if (hari.length === 0) return '-'
  if (hari.length === 7) return 'Setiap Hari'

  const order = HARI_LIST
  const sorted = [...hari].sort((a, b) => order.indexOf(a) - order.indexOf(b))

  const ranges: string[] = []
  let start = sorted[0]!
  let prev = sorted[0]!

  for (let i = 1; i <= sorted.length; i++) {
    const cur = sorted[i]
    const prevIdx = order.indexOf(prev)
    const curIdx = cur !== undefined ? order.indexOf(cur) : -1

    if (cur !== undefined && curIdx === prevIdx + 1) {
      prev = cur
    } else {
      ranges.push(start === prev ? start : `${start}–${prev}`)
      if (cur !== undefined) {
        start = cur
        prev = cur
      }
    }
  }

  return ranges.join(', ')
}

/** Convert structured value to the human-readable string stored in DB */
export function jamLayananToString(val: JamLayananValue | undefined): string {
  if (!val || val.hari.length === 0) return ''
  return `${formatHari(val.hari)} ${val.jamBuka}–${val.jamTutup}`
}

/** Parse a stored string back to structured value (best-effort for edit mode) */
export function parseJamLayanan(raw: string | undefined | null): JamLayananValue | undefined {
  if (!raw) return undefined
  // Try to match "Hari... HH:MM–HH:MM"
  const match = raw.match(/^(.+?)\s+(\d{2}:\d{2})[–-](\d{2}:\d{2})$/)
  if (!match) return undefined
  const hariStr = match[1]
  const jamBuka = match[2]
  const jamTutup = match[3]
  if (!hariStr || !jamBuka || !jamTutup) return undefined

  // Expand ranges like "Senin–Jumat"
  const hari: string[] = []
  for (const part of hariStr.split(',').map((s) => s.trim())) {
    const rangeParts = part.split(/[–-]/)
    if (rangeParts.length === 2) {
      const p0 = rangeParts[0]?.trim() ?? ''
      const p1 = rangeParts[1]?.trim() ?? ''
      const startIdx = HARI_LIST.indexOf(p0)
      const endIdx = HARI_LIST.indexOf(p1)
      if (startIdx !== -1 && endIdx !== -1) {
        for (let i = startIdx; i <= endIdx; i++) {
          const day = HARI_LIST[i]
          if (day) hari.push(day)
        }
      }
    } else if (HARI_LIST.includes(part)) {
      hari.push(part)
    }
  }
  return hari.length > 0 ? { hari, jamBuka, jamTutup } : undefined
}

// ─── Component ────────────────────────────────────────────────────────────────

export function JamLayananPicker({ value, onChange, disabled }: JamLayananPickerProps) {
  const [selectedHari, setSelectedHari] = useState<string[]>(value?.hari ?? [])
  const [jamBuka, setJamBuka] = useState<string>(value?.jamBuka ?? '08:00')
  const [jamTutup, setJamTutup] = useState<string>(value?.jamTutup ?? '17:00')

  // Sync internal state → parent whenever anything changes
  useEffect(() => {
    onChange({ hari: selectedHari, jamBuka, jamTutup })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHari, jamBuka, jamTutup])

  const toggleHari = (hari: string) => {
    setSelectedHari((prev) =>
      prev.includes(hari) ? prev.filter((h) => h !== hari) : [...prev, hari]
    )
  }

  const applyPreset = (preset: JamLayananValue) => {
    setSelectedHari(preset.hari)
    setJamBuka(preset.jamBuka)
    setJamTutup(preset.jamTutup)
  }

  const preview = jamLayananToString({ hari: selectedHari, jamBuka, jamTutup })

  return (
    <div className="space-y-4 rounded-lg border p-4">
      {/* Preset shortcuts */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          Pilihan Cepat
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              disabled={disabled}
              onClick={() => applyPreset(p.value)}
              className="rounded-full border px-3 py-1 text-xs transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hari kerja */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Hari Buka</p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {HARI_LIST.map((hari) => (
            <label
              key={hari}
              className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border p-2 text-center text-xs transition-colors select-none
                ${selectedHari.includes(hari)
                  ? 'border-primary bg-primary/10 font-semibold text-primary'
                  : 'hover:bg-muted'
                }
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
            >
              <Checkbox
                checked={selectedHari.includes(hari)}
                onCheckedChange={() => !disabled && toggleHari(hari)}
                disabled={disabled}
                className="sr-only"
              />
              <span>{hari.slice(0, 3)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Jam buka & tutup */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-sm">Jam Buka</Label>
          <Select value={jamBuka} onValueChange={setJamBuka} disabled={disabled}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {TIME_OPTIONS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-sm">Jam Tutup</Label>
          <Select value={jamTutup} onValueChange={setJamTutup} disabled={disabled}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {TIME_OPTIONS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Preview */}
      {selectedHari.length > 0 && (
        <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2">
          <Clock className="text-muted-foreground h-4 w-4 shrink-0" />
          <span className="text-sm font-medium">{preview}</span>
          <Badge variant="secondary" className="ml-auto text-xs">
            {selectedHari.length} hari
          </Badge>
        </div>
      )}
    </div>
  )
}
