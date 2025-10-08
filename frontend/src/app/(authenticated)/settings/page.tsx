'use client';

import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import AppLayout from '../layout';
import { EditNdaFormManual } from './edit-nda-feature/edit-nda';
// IMPORT CHANGE: Replacing the old form with the new Redux-integrated manual form

export default function SettingsPage() {
  // NOTE: next-themes is assumed to be configured outside this component

  return (
    <AppLayout>

    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Configure application settings.
        </p>
      </header>
      <div className="space-y-8">
        {/* NDA Editing Card */}
        <Card>
            <CardHeader>
                <CardTitle>Non-Disclosure Agreement</CardTitle>
            </CardHeader>
            <CardContent>
                {/* COMPONENT CHANGE: Using the Redux-driven form */}
                <EditNdaFormManual />
            </CardContent>
        </Card>
      </div>
    </div>
    </AppLayout>
  );
}