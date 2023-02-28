import {Pipe, PipeTransform} from "@angular/core";
import * as moment from 'moment'
@Pipe({name: 'moment'})
export class MomentFormatPipe implements PipeTransform {

  transform(value: any, format: string): string {

    return moment(value).format(format)
  }
}
