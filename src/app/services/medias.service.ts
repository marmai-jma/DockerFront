import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaDto } from '../shared-data/media-dto';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Globals } from '../globals';


@Injectable({
  providedIn: 'root'
})
export class MediasService {
  globals: Globals;
  url: string;

  constructor(private http: HttpClient,
              globals: Globals, ) {this.globals = globals;
    }

    // Obs à cause de la requête HTTP
    getMedias(): Observable<MediaDto[]> {
      this.url = this.globals.BACKEND_URL;
      return this.http.get(`${this.url}/medias`)
      .pipe(
        map((jsonMedias: any[]) => jsonMedias.map(jsonMedia => new MediaDto(jsonMedia)))
        );
    }

    // par Id
    getMedia(mediaId: any): Observable<MediaDto> {
      this.url = this.globals.BACKEND_URL;
      return this.http.get(`${this.url}/medias/${mediaId}`)
      .pipe(
        map(jsonMedia => new MediaDto(jsonMedia)));
    }

    // Ne sert finalement pas car le classement par catégorie se fait via la classe ListMediasComponent
    getMediaByCategory(category: any): Observable<MediaDto[]> {
      this.url = this.globals.BACKEND_URL;
      return this.http.get(`${this.url}/medias/category/${category}`)
      .pipe(
        map((jsonMedias: any[]) => jsonMedias.map(jsonMedia => new MediaDto(jsonMedia)))
        );
    }

      // delete a faire uniquement pour l'admin USER

    }
