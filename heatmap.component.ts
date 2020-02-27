import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Heatmap from 'visual-heatmap';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  @ViewChild('canvasdiv') el: ElementRef;

  data = [];
  instance;
  imageUrl;
  images = [];
  valObjArr = [];

  constructor() { }

  ngOnInit() {
    const canvas = document.getElementById('canvas');
    this.instance = Heatmap('#' + canvas.id, {
      size: 25.0,
      max: 5,
      blur: 1.0,
      translate: [20, 20],
      gradient: [{
        color: [0, 0, 0, 0.00],
        offset: 0
      }, {
        color: [0, 0, 255, 0.2],
        offset: 0.2
      }, {
        color: [0, 255, 0, 0.5],
        offset: 0.45
      }, {
        color: [255, 255, 0, 1.0],
        offset: 0.85
      }, {
        color: [255, 0, 0, 1.0],
        offset: 1.0
      }]
    });

    for (let j = 1; j < 20; j++) {
      let dataArr = [];
      for (let i = 0; i < 10; i++) {
        const obj = { x: i * j * 2, y: i * j * 2, value: i };
        dataArr.push(obj);
        this.data.push(obj);
      }
      console.log(dataArr);
      this.valObjArr.push(dataArr);
      this.instance.renderData(dataArr);

      const canvasEle: HTMLCanvasElement = this.el.nativeElement.lastElementChild as HTMLCanvasElement;
      this.imageUrl = canvasEle.toDataURL('image/jpg');
      this.images.push(this.imageUrl);
    }
    setInterval(() => { this.setRenderData(); this.setData(); }, 500);
  }

  indexCount = 0;

  setRenderData() {
    const valobj = this.valObjArr[this.indexCount];
    this.instance.renderData(valobj);
    if (this.indexCount === this.valObjArr.length - 1) {
      this.indexCount = 0;
    } else {
      this.indexCount++;
    }
  }

  setData() {
    this.imageUrl = this.images[this.indexCount];
    if (this.indexCount === this.images.length - 1) {
      this.indexCount = 0;
    } else {
      this.indexCount++;
    }
  }

}
