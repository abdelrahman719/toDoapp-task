import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HandleDescPipe } from '../../Shared/pipes/handle-desc.pipe';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { Task } from '../../Core/interfaces/tasks.interface';
import { TasksService } from '../../Core/services/tasks.service';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [InputTextareaModule, ReactiveFormsModule, HandleDescPipe ,TooltipModule ,CommonModule ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements OnInit {
  taskCardForm!: FormGroup;
  @Input() taskData!: Task;
  editMood :boolean=false




  constructor(private formBuilder: FormBuilder , private tasksService:TasksService) {
    this.taskCardForm = this.formBuilder.group({
      desc: [{ value: '', disabled: true } , Validators.required],
      userName: ['']
    })

  }
  ngOnInit(): void {
    this.taskCardForm.get('desc')?.setValue(this.taskData.desc);
    this.tasksService.newTaskTrigger$.subscribe({
      next: (res) => {
        if (res && !this.taskData.id) {         
          this.editTask()
        }
      }
    })

  }




  editTask() {
    this.editMood = true
    this.taskCardForm.get('desc')?.enable()
  }
  saveEdit(){
    let tempTask = this.taskData
    tempTask.desc = this.taskCardForm.value.desc
    if(tempTask.id){
      this.tasksService.editTask(tempTask).subscribe({
        next:(res)=>{
          console.log('res: ', res);
          this.editMood = false
          this.taskCardForm.get('desc')?.disable()
  
        }
      })
    }else{
      this.tasksService.newTask(tempTask).subscribe({
        next:(res)=>{
          console.log('res: ', res);
          window.location.reload()
  
        }
      })
    }

  }
  deleteTask(){
    if(this.taskData.id){

      this.tasksService.deleteTask(this.taskData.id).subscribe({
        next:(res)=>{
          console.log('res: ', res);
          window.location.reload()
  
        }
      })
    }
  }


}
