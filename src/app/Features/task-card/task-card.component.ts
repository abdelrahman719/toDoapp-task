import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HandleDescPipe } from '../../Shared/pipes/handle-desc.pipe';
import { FormGroup, ReactiveFormsModule ,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [InputTextareaModule ,ReactiveFormsModule , HandleDescPipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements OnInit {
  taskCardForm!:FormGroup;
  @Input() taskDesc ='';
  @Output() editTaskEmitter = new EventEmitter<string>();



  editTask(){
    console.log("from child") 
    this.editTaskEmitter.emit("hhhh")
  }
constructor( private formBuilder:FormBuilder){
  this.taskCardForm=this.formBuilder.group({
    desc:[{value:'' ,disabled: true}],
    userName:['']
  })

}
ngOnInit(): void {
  this.taskCardForm.get('desc')?.setValue(this.taskDesc)
  console.log(this.taskDesc)
}


}
