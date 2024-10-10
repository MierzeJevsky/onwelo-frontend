import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Person } from './person';
import { PersonEnum } from './personEnum';

@Component({
  selector: 'vote-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './vote.component.html',
  styleUrls: [
    './vote.component.css'
  ]
})
export class VoteComponent {
  
  private readonly apiServerUrl = 'http://localhost:8080';
  public people: Person[] = [] ;
  public voters: Person[] | undefined;
  public candidates: Person[] | undefined;
  public voterName : string = 'Adam';
  public candidateName : string = 'Eve';

  constructor(
    private http: HttpClient
  ){
    this.fetchAllPeople();
    this.extractVotersAndCandidates();
  }
  
  extractVotersAndCandidates() {
    this.voters = [...this.people].filter((person) => person.personEnum === PersonEnum.VOTER);
    this.candidates = [...this.people].filter((person) => person.personEnum === PersonEnum.VOTER);
  }

  fetchAllPeople() {
    this.http.get(`${this.apiServerUrl}/vote/get_all`)
    .subscribe((resultData: any)=>
    {
      console.log(resultData);
      this.people = resultData;
    });
  }

  addVoter() {
    this.http.post<Person>(`${this.apiServerUrl}/voter/add`, this.voterName);
  }

  addCandidate() {
    this.http.post<Person>(`${this.apiServerUrl}/candidate/add`, this.candidateName);
  }

  vote(){
    let params = new HttpParams()
    .set('voterName', this.voterName)
    .set('candidateName', this.candidateName);
    
    return this.http.post<Person>(`${this.apiServerUrl}/candidate/add`, params);
  }
}
