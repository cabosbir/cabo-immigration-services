'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PersonalInfoStepProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
  const nationalities = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Netherlands',
    'Other',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Personal Information</h2>

      <div>
        <Label htmlFor="fullName">Full Legal Name (as on passport) *</Label>
        <Input
          id="fullName"
          value={data.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          placeholder="John Doe"
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="john@example.com"
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number (WhatsApp preferred)</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange('dateOfBirth', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="nationality">Nationality *</Label>
          <Select value={data.nationality} onValueChange={(value) => onChange('nationality', value)}>
            <SelectTrigger id="nationality" className="mt-2">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              {nationalities.map((nat) => (
                <SelectItem key={nat} value={nat}>{nat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="passportNumber">Passport Number *</Label>
          <Input
            id="passportNumber"
            value={data.passportNumber}
            onChange={(e) => onChange('passportNumber', e.target.value)}
            placeholder="A12345678"
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="passportExpiration">Passport Expiration Date *</Label>
          <Input
            id="passportExpiration"
            type="date"
            value={data.passportExpiration}
            onChange={(e) => onChange('passportExpiration', e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="currentAddress">Current Address in Home Country</Label>
        <Input
          id="currentAddress"
          value={data.currentAddress}
          onChange={(e) => onChange('currentAddress', e.target.value)}
          placeholder="123 Main Street, City, Country"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="intendedCaboAddress">Intended Address in Cabo (optional)</Label>
        <Input
          id="intendedCaboAddress"
          value={data.intendedCaboAddress}
          onChange={(e) => onChange('intendedCaboAddress', e.target.value)}
          placeholder="Cabo address if known"
          className="mt-2"
        />
      </div>
    </div>
  );
}
