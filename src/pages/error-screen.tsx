import './error-screen.css';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../routes';
import { ErrorCodesDesc } from '../consts';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getErrorCode } from '../store/error-process/selectors';
import { useEffect } from 'react';
import { setErrorCode } from '../store/error-process/error-process';

export type ErrorScreenProps = {
  errorStatusCode?: number;
};

export default function ErrorScreen({ errorStatusCode = -1 }: ErrorScreenProps): JSX.Element {
  return (
    <div>An error occured</div>
  );
}
