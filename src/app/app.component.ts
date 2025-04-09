import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Needed for *ngFor, *ngIf
import { ApiResponseModel, ITask, Task } from './model/task';
import { FormsModule } from '@angular/forms';
import { MasterService } from './service/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ This fixes the issue
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  taskList: ITask[] = [];
  taskObj: Task = new Task();

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.loadAllTask();
  }

  loadAllTask() {
    this.masterService.getAllTaskList().subscribe((res: ApiResponseModel) => {
      this.taskList = res.data;
      console.log(res);
    });
  }

  trackByItemId(index: number, item: ITask): any {
    return item.itemId;
  }
  addTask() {
    this.masterService.addNewTask(this.taskObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result) {
          alert('task created sucessfully');
          this.loadAllTask();
          this.taskObj = new Task();
        }
      },
      (error) => {
        alert('API call error');
      }
    );
  }
}
