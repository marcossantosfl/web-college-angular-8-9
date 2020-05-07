import {Subject} from '../subject/subject';
import {Coming} from '../coming/coming';

export class Account
{
  id: number;
  login: string;
  name: string;
  password: string;
  date: string;
  email: string;
  subject = new Array<Subject>();
  coming = new Array<Coming>();
}
