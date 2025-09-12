import { Injectable } from '@nestjs/common';
import { IClass } from 'src/interfaces/class.interface';

@Injectable()
export class ClassService {
  private readonly classess: IClass[] = [];

  readonly createClasses = (classes: Record<string, string>) => {
    console.log('[User Service]: Create classes');
    const newClasses: IClass = {
      id: classes.id ?? `classes_${Date.now()}`,
      name: classes.name,
      subject: classes.subject,
    };
    this.classess.push(newClasses);

    return newClasses;
  };

  readonly getClasses = (id: string) => {
    console.log('[User Service]: Get classes with id: ' + id);
    return this.classess.find((st) => st.id === id);
  };

  readonly getAllClassess = () => {
    console.log('[User Service]: Get All classess ');
    return this.classess;
  };
}
