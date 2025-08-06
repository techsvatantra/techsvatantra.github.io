
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormError from './FormError';
import { Users, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ReferencesStep = ({ control, register, errors }) => {
  const { fields: professionalFields } = useFieldArray({
    control,
    name: 'professionalReferences',
  });

  const { fields: personalFields } = useFieldArray({
    control,
    name: 'personalReferences',
  });

  const renderReferenceTable = (title, icon, fields, fieldName, error) => (
    <Card className="overflow-hidden bg-white/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Full Name</TableHead>
              <TableHead className="w-1/3">Phone Number</TableHead>
              <TableHead className="w-1/3">Relationship</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id} className="bg-white">
                <TableCell>
                  <Input {...register(`${fieldName}.${index}.name`)} placeholder="Reference's Name" className="bg-slate-50"/>
                  <FormError message={error?.[index]?.name?.message} />
                </TableCell>
                <TableCell>
                  <Input {...register(`${fieldName}.${index}.phone`)} type="tel" placeholder="(123) 456-7890" className="bg-slate-50"/>
                  <FormError message={error?.[index]?.phone?.message} />
                </TableCell>
                <TableCell>
                  <Input {...register(`${fieldName}.${index}.relationship`)} placeholder="e.g., Former Manager" className="bg-slate-50"/>
                  <FormError message={error?.[index]?.relationship?.message} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 pt-2">
            <FormError message={error?.root?.message} />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold text-primary mb-6">Step 3: References</h3>
      
      <div className="space-y-6">
        {renderReferenceTable(
          'Professional References',
          <Users className="h-5 w-5 text-primary" />,
          professionalFields,
          'professionalReferences',
          errors.professionalReferences
        )}
      </div>

      <div className="space-y-6">
        {renderReferenceTable(
          'Personal References',
          <UserCheck className="h-5 w-5 text-secondary" />,
          personalFields,
          'personalReferences',
          errors.personalReferences
        )}
      </div>
    </div>
  );
};

export default ReferencesStep;
