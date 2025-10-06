'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '../../../../components/ui/button';
import { type Visitor } from '../../visitor-list/columns';
import { ArrowUpDown } from 'lucide-preact';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog"

type ColumnsProps = {
  onCheckout: (visitorId: string) => void;
};

export const columns = ({ onCheckout }: ColumnsProps): ColumnDef<Visitor>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Visitor ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="pl-4">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'checkIn',
    header: 'Check-in Time',
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const visitor = row.original;

      return (
        <div className="text-right">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                 <Button variant="destructive" size="sm">Check Out</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will check out <span className="font-bold">{visitor.name}</span>. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onCheckout(visitor.id)}>
                    Confirm Check Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      );
    },
  },
];
