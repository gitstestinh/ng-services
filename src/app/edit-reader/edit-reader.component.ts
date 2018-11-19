import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';
import { BadgeService } from 'app/services/badge.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styles: [],
  providers: [BadgeService]
})
export class EditReaderComponent implements OnInit {

  selectedReader: Reader;
  currentBadge: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private badgeService: BadgeService) { }

  ngOnInit() {
    const readerID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getReaderById(readerID).subscribe(
      (data: Reader) => this.selectedReader = data,
      (err: any) => console.log(err)
    );
    this.currentBadge = this.badgeService.getReaderBadge(this.selectedReader.totalMinutesRead);
  }

  saveChanges() {
    this.dataService.updateReader(this.selectedReader).subscribe(
      val => this.router.navigate(['/dashboard']),
      (err: any) => console.log(err)
    );
  }
}