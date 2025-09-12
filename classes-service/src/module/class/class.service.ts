import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IClass } from 'src/interfaces/class.interface';

@Injectable()
export class ClassService {
  private readonly classess: IClass[] = [];

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  readonly createClasses = (classes: IClass) => {
    console.log('[Class Service]: Create classes');
    const newClasses: IClass = {
      id: classes.id ?? `classes_${Date.now()}`,
      name: classes.name,
      subject: classes.subject,
      teacher: classes.teacher,
      student: classes.student,
    };
    this.classess.push(newClasses);

    return newClasses;
  };

  readonly updateClasses = (classes: IClass) => {
    console.log('[Class Service]: Update classes');
    const getClass = this.classess.find((cl) => cl.id === classes.id);

    if (!getClass) {
      console.log('Class not found');
      return null;
    }

    getClass.name = classes.name ?? (getClass.name as string);
    getClass.subject = classes.subject ?? getClass.subject;
    getClass.student =
      classes.student ?? (getClass.student as Record<string, string>[]);
    getClass.teacher =
      classes.teacher ?? (getClass.teacher as Record<string, string>);
    this.kafkaClient.emit('class.updated', { ...getClass });

    return getClass;
  };

  readonly updateStudentInClass = (student: Record<string, string>) => {
    this.classess.forEach((cls) => {
      const theStudent = cls.student?.find((clst) => clst.id === student.id);

      if (theStudent) {
        theStudent.name = student.name ?? theStudent.name;
        theStudent.grade = student.grade ?? theStudent.grade;
      }
    });

    console.log('The affected student has been updated...');
  };

  readonly updateTeacherInClass = (teacher: {
    data: Record<string, string>;
  }) => {
    this.classess.forEach((cls) => {
      if (cls.teacher && cls.teacher.id === teacher.data.id) {
        cls.teacher.name = teacher.data.name ?? cls.teacher.name;
        cls.teacher.subject = teacher.data.subject ?? cls.teacher.subject;
      }
    });

    console.log('The affected teacher has been updated...');
  };

  readonly getClasses = (id: string) => {
    console.log('[Class Service]: Get classes with id: ' + id);
    return this.classess.find((st) => st.id === id);
  };

  readonly getAllClassess = () => {
    console.log('[Class Service]: Get All classess ');
    return this.classess;
  };
}
