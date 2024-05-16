import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'handleDesc',
  standalone: true
})
export class HandleDescPipe implements PipeTransform {

 
  
  transform(value: string): string {

    let result = value.slice(0, 180);
    return result.concat(' ...');
  }

}
