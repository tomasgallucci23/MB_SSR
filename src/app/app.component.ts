import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Location } from '@angular/common';
import { AppService } from './app.service';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public activeRouter: string = '';
  constructor(
    public urlLocation: Location,
    private _cdr: ChangeDetectorRef,
    private _appService: AppService,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Estudio de abogados que se dedican a los niños, familia, género y minorías, como así tambien en la defensa de menores.',
      },
      { name: 'author', content: 'Dativa Solutions' },
      { name: 'generator', content: 'DS 1.0.0' },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'keywords',
        content:
          'Estudio de abogados, Abogadas, Estudio de abogadas,Rosario, Santa fe, Estudio, Leyes, Derechos,Abogados de familia, Defensores de niños, Derechos humanos, Género y minorías, Derecho de la infancia, Penal de menores, Mariana Martínez Bellinzona',
      },
      {
        name: 'date',
        content: moment().format('YYYY-MM-DD'),
        scheme: 'YYYY-MM-DD',
      },
      { charset: 'UTF-8' },
    ]);

    this.setTitle('Estudio Martínez Martínez Bellinzona');
  }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  ngAfterViewInit() {
    if (this.document) {
      var seccionOne = this.document.getElementsByClassName('que-hacemos'),
        seccionTwo = this.document.getElementsByClassName('about-us'),
        seccionThree = this.document.getElementsByClassName('contact-us'),
        seccionFour = this.document.getElementsByClassName('home');
      this.getWindow().addEventListener('scroll', () => {
        this._cdr.detectChanges();
        let navOne = this.document.getElementById('nav-que-hacemos'),
          navTwo = this.document.getElementById('nav-about-us'),
          navThree = this.document.getElementById('nav-contact-us');
        for (let i = 0; i < seccionOne.length; i++) {
          if (isInViewport(seccionOne[i])) {
            if (navOne && navOne.classList.contains('active')) {
              return;
            } else if (navOne) {
              navOne.classList.add('active');
              navTwo.classList.remove('active');
              navThree.classList.remove('active');
            }
          }
        }

        for (let i = 0; i < seccionTwo.length; i++) {
          if (isInViewport(seccionTwo[i])) {
            if (navTwo && navTwo.classList.contains('active')) {
              return;
            } else if (navTwo) {
              navTwo.classList.add('active');
              navOne.classList.remove('active');
              navThree.classList.remove('active');
            }
          }
        }
        for (let i = 0; i < seccionThree.length; i++) {
          if (isInViewport(seccionThree[i])) {
            if (navThree && navThree.classList.contains('active')) {
              return;
            } else if (navThree) {
              navThree.classList.add('active');
              navOne.classList.remove('active');
              navTwo.classList.remove('active');
            }
          }
        }
        for (let i = 0; i < seccionFour.length; i++) {
          if (isInViewport(seccionFour[i])) {
            navOne.classList.remove('active');
            navOne.classList.remove('active');
            navTwo.classList.remove('active');
          }
        }
      });
      this.getWindow().addEventListener('load', () => {
        this.document
          .getElementById('nav-que-hacemos')
          .classList.remove('active');
        this.document.getElementById('nav-about-us').classList.remove('active');
        this.document
          .getElementById('nav-contact-us')
          .classList.remove('active');
      });
      const that = this;
      function isInViewport(t: any) {
        if (t) {
          var e =
              that.getWindow().innerWidth ||
              that.document.documentElement.clientWidth,
            n =
              that.getWindow().innerHeight ||
              that.document.documentElement.clientHeight;
          if (t != null) {
            var o = t.getBoundingClientRect();
            return (
              ((o.left >= 0 && o.left <= e) ||
                (o.right >= 0 && o.right <= e)) &&
              ((o.top >= 0 && o.top <= n) || (o.bottom >= 0 && o.bottom <= n))
            );
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }

  getWindow(): Window | null {
    return this.document.defaultView;
  }

  isInViewport(el: Element) {
    if (el) {
      var width =
          this.getWindow().innerWidth ||
          this.document.documentElement.clientWidth,
        heigth =
          this.getWindow().innerHeight ||
          this.document.documentElement.clientHeight;
      if (el != null) {
        var rect = el.getBoundingClientRect();
        return (
          ((rect.left >= 0 && rect.left <= width) ||
            (rect.right >= 0 && rect.right <= width)) &&
          ((rect.top >= 0 && rect.top <= heigth) ||
            (rect.bottom >= 0 && rect.bottom <= heigth))
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  setActiveRouter() {
    this.urlLocation.onUrlChange((x) => (this.activeRouter = x));
    this._cdr.detectChanges();
  }
  ngOnInit(): void {
    this.setActiveRouter();
  }
  goToNextSection() {
    const doc = this.document.getElementById('what-do-we-do');
    const positionDoc = doc?.getBoundingClientRect();
    this.getWindow().scrollTo(positionDoc);
  }
  collapseAndView() {
    const navbar = this.document.getElementById('container-navbar-links');
    const hasClass = navbar.classList.contains('collapsable');
    if (hasClass) {
      navbar.classList.remove('collapsable', 'collapse', 'show');
      navbar.classList.add('collapsing', 'collapse');
    } else {
      navbar.classList.remove('collapsing', 'collapse');
      navbar.classList.add('collapsable', 'collapse', 'show');
    }
  }
  downloadCFV() {
    this._appService.downloadVCF();
  }
}
