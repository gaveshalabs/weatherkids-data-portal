import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log("MapComponent");
  }
}
