import { useState } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { data as allVisitors } from '../../visitor-list/data';
import type { Visitor } from '../../visitor-list/columns';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../../../components/ui/card';

export default function CheckoutPage() {
  const [visitors, setVisitors] = useState<Visitor[]>(
    allVisitors.filter((v) => v.status === 'Checked In')
  );

  const handleCheckout = (visitorId: string) => {
    // In a real app, this would be an API call.
    // For now, we just update the local state.
    console.log(`Checking out visitor ${visitorId}`);
    setVisitors((prev) => prev.filter((v) => v.id !== visitorId));
    // We could also update the main data source here if needed.
    const visitor = allVisitors.find(v => v.id === visitorId);
    if (visitor) {
        visitor.status = "Checked Out";
        visitor.checkOut = new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        }).replace(',', '');
    }
  };

  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center">
       <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold">Visitor Check Out</CardTitle>
          <CardDescription>
            Find a visitor by their ID to check them out.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <DataTable columns={columns({ onCheckout: handleCheckout })} data={visitors} />
        </CardContent>
      </Card>
    </div>
  );
}
