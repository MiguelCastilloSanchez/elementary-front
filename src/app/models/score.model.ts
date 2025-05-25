
import { Student } from './student.model';
import { Subject } from './subject.model';
export class Score {
    scoreId?: number;
    enrollment?: string;
    subjectName?: string;
    score?: number;
    startDate?: string;
    endDate?: string;
    student?: Student;
    subject?: Subject;
}