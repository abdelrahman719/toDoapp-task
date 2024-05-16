import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HandleDescPipe } from '../../Shared/pipes/handle-desc.pipe';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { Task } from '../../Core/interfaces/tasks.interface';
import { TasksService } from '../../Core/services/tasks.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [InputTextareaModule, ReactiveFormsModule, HandleDescPipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements OnInit {
  taskCardForm!: FormGroup;
  @Input() taskData!: Task;
  @Output() editTaskEmitter = new EventEmitter<string>();
  editMood=false




  constructor(private formBuilder: FormBuilder , private tasksServices:TasksService) {
    this.taskCardForm = this.formBuilder.group({
      desc: [{ value: '', disabled: true }],
      userName: ['']
    })

  }
  ngOnInit(): void {
    this.taskCardForm.get('desc')?.setValue(this.taskData.desc)
    // console.log(this.taskDesc)
  }

  editTask() {
    this.editMood = true
    this.taskCardForm.get('desc')?.enable()
  }
  saveEdit(){
    let tempTask = this.taskData
    tempTask.desc = this.taskCardForm.value.desc


    this.tasksServices.editTask(tempTask).subscribe({
      next:(res)=>{
        console.log('res: ', res);
        this.editMood = false
        this.taskCardForm.get('desc')?.disable()

      }
    })

  }
  deleteTask(){
    this.tasksServices.deleteTask(this.taskData.id).subscribe({
      next:(res)=>{
        console.log('res: ', res);

      }
    })
  }
  changeStatus(){

  }


}
