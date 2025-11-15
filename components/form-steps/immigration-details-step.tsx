'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ImmigrationDetailsStepProps {
  data: any;
  onChange: (field: string, value: string) => void;
  serviceType: string;
}

export function ImmigrationDetailsStep({ data, onChange, serviceType }: ImmigrationDetailsStepProps) {
  const visaStatuses = ['Tourist (FMM)', 'Student', 'Work', 'Temporary Resident', 'None'];
  const incomeSources = ['Retirement/Pension', 'Remote Work', 'Business Owner', 'Investments', 'Other'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Immigration Details</h2>

      {serviceType !== 'work-permit' && (
        <>
          <div>
            <Label>Have you lived in Mexico before?</Label>
            <RadioGroup value={data.livedInMexicoBefore} onValueChange={(value) => onChange('livedInMexicoBefore', value)}>
              <div className="flex items-center gap-3 mt-3">
                <RadioGroupItem value="true" id="yes" />
                <Label htmlFor="yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="false" id="no" />
                <Label htmlFor="no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="visaStatus">Current Visa Status (if in Mexico)</Label>
            <Select value={data.currentVisaStatus} onValueChange={(value) => onChange('currentVisaStatus', value)}>
              <SelectTrigger id="visaStatus" className="mt-2">
                <SelectValue placeholder="Select visa status" />
              </SelectTrigger>
              <SelectContent>
                {visaStatuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="incomeSource">Proof of Income Source *</Label>
            <Select value={data.incomeSource} onValueChange={(value) => onChange('incomeSource', value)}>
              <SelectTrigger id="incomeSource" className="mt-2">
                <SelectValue placeholder="Select income source" />
              </SelectTrigger>
              <SelectContent>
                {incomeSources.map((source) => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="monthlyIncome">Monthly Income (USD) *</Label>
            <Input
              id="monthlyIncome"
              type="number"
              value={data.monthlyIncome}
              onChange={(e) => onChange('monthlyIncome', e.target.value)}
              placeholder="2700"
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Temporary: min $2,700 | Permanent: min $4,500
            </p>
          </div>

          <div>
            <Label>Do you have Mexican family members?</Label>
            <RadioGroup value={data.hasMexicanFamily} onValueChange={(value) => onChange('hasMexicanFamily', value)}>
              <div className="flex items-center gap-3 mt-3">
                <RadioGroupItem value="true" id="family-yes" />
                <Label htmlFor="family-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="false" id="family-no" />
                <Label htmlFor="family-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </div>
        </>
      )}

      {serviceType === 'work-permit' && (
        <>
          <div>
            <Label htmlFor="employerName">Employer Name in Mexico *</Label>
            <Input
              id="employerName"
              value={data.employerName}
              onChange={(e) => onChange('employerName', e.target.value)}
              placeholder="Company name"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              value={data.jobTitle}
              onChange={(e) => onChange('jobTitle', e.target.value)}
              placeholder="Your position"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="employerRFC">Employer RFC (Tax ID)</Label>
            <Input
              id="employerRFC"
              value={data.employerRFC}
              onChange={(e) => onChange('employerRFC', e.target.value)}
              placeholder="RFC"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="jobStartDate">Job Start Date</Label>
            <Input
              id="jobStartDate"
              type="date"
              value={data.jobStartDate}
              onChange={(e) => onChange('jobStartDate', e.target.value)}
              className="mt-2"
            />
          </div>
        </>
      )}
    </div>
  );
}
