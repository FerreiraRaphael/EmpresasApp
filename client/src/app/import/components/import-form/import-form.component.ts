import { Component, OnInit } from '@angular/core';
import { ImportDataService } from 'app/import/services/import-data.service';

@Component({
  selector: 'app-import-form',
  templateUrl: './import-form.component.html',
  styles: []
})
export class ImportFormComponent implements OnInit {
  file: File;
  loading = false;
  constructor(private importDataService: ImportDataService) {}

  ngOnInit() {}

  onChange(event) {
    this.file = event.srcElement.files[0];
  }

  onSubmit() {
    this.loading = true;
    this.importDataService.sendFile(this.file).subscribe(data => {
      this.loading = false;
      console.log(data);
    });
  }
}
