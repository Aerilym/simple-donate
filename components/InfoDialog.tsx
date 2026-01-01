'use client';

import { InfoDialog as InfoDialogRaw } from '@aerilym/info-dialog';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export function InfoDialog() {
  return (
    <InfoDialogRaw
      components={{
        Button,
        Dialog,
        DialogContent,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
        DialogDescription,
        DialogFooter,
      }}
      options={{
        title: 'Simple Donate',
        description:
          'Support my open source work by sponsoring me or sending a donation. This donation and sponsorship page is open source and fully customisable.',
        hideDonateButton: true,
        sourceUrl: 'https://github.com/Aerilym/simple-donate',
      }}
    />
  );
}
