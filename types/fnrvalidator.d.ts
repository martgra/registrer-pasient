// fnrvalidator.d.ts

declare module '@navikt/fnrvalidator' {
    type LENGTH_ERROR = 'fnr, dnr or hnr must consist of 11 digits';
    type CHECKSUM_ERROR = "checksums don't match";
    type DATE_ERROR = 'invalid date';
    type ErrorReason = LENGTH_ERROR | CHECKSUM_ERROR | DATE_ERROR;
  
    type NrType = 'dnr' | 'fnr' | 'hnr' | 'tnr' | 'dnr-and-hnr' | 'dnr-and-tnr';
  
    type OkResult = { status: 'valid'; type: NrType };
    type ErrorResult = { status: 'invalid'; reasons: ErrorReason[] };
    type ValidationResult = OkResult | ErrorResult;
  
    export function idnr(digits: string): ValidationResult;
  }
  