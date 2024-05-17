import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HandleDescPipe } from '../../Shared/pipes/handle-desc.pipe';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { Task } from '../../Core/interfaces/tasks.interface';
import { TasksService } from '../../Core/services/tasks.service';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [InputTextareaModule, ReactiveFormsModule,
     HandleDescPipe ,TooltipModule ,CommonModule , TranslateModule],
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
    if(this.taskData.id){
      let tempTask = {
        id:this.taskData.id,
        desc: this.taskCardForm.value.desc,
        userId: this.taskData.userId,
        userName: this.taskData.userName,
        status: this.taskData.status,
      }
      this.tasksService.editTask(tempTask).subscribe({
        next:(res)=>{
          this.editMood = false
          this.taskCardForm.get('desc')?.disable()
  
        }
      })
    }else{
      let tempTask = {
        desc: this.taskCardForm.value.desc,
        userId: this.taskData.userId,
        userName: this.taskData.userName,
        status: this.taskData.status,
      }
      this.tasksService.newTask(tempTask);
      this.tasksService.newTaskTrigger$.next(false)
    }

  }
  deleteTask(){
    if(this.taskData.id){
      debugger
      this.tasksService.deleteTask(this.taskData.id)
    }
  }


}
