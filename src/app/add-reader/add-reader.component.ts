import { Component, OnInit } from '@angular/core';

import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styles: []
})
export class AddReaderComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() { }

  saveReader(formValues: any): void {
    const newReader: Reader = <Reader>formValues;
    newReader.readerID = 0;

    this.dataService.addReader(newReader).subscribe(
      (data: Reader) => this.router.navigate(['/dashboard']),
      (err: any) => console.log(err)
    );
  }
}
