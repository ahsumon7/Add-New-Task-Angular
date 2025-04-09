import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel, Task,ITask } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl : string = 'http://freeapi.gerasim.in/api/JWT/'

  constructor(private http : HttpClient) { }
  
  getAllTaskList(): Observable <ApiResponseModel>{
    return this.http.get <ApiResponseModel>(this.apiUrl + 'GetAllTaskList');
  }

  addNewTask(obj:Task) : Observable<ApiResponseModel>{
    return this.http.post<ApiResponseModel>(this.apiUrl + 'CreateNewTask',obj);
  }
}
