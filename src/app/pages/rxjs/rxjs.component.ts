import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 


    this.subscription = this.regresaObservable()
      .pipe(
        retry(2), //numero de intentos
        map(res => {
          console.log(res);
          return res +1;
        })
      )
      .subscribe( 
        numero => console.log('Subs', numero), 
        error => console.log('Error en el obs', error),
        () => console.log('El observador termino') 
      );

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{
        return new Observable((observer: Subscriber<any>) =>{
    
          let contador = 0;
    
          let intervalo = setInterval(()=> {
              contador +=1;

              const salida = {
                valor:contador
              };

              observer.next( salida );
    
              // if(contador === 3){
              //   clearInterval(intervalo);
              //   observer.complete();
              // }
    
              // if(contador === 2){
              //   //al ejecutar un error, sale del observable
              //   //clearInterval(intervalo);
              //   console.log('Ocurrio un error, reintentando');
              //   observer.error('Auxilio');
              // }
          }, 1000);
    
        }).pipe( 
            map( resp => {
                return resp.valor;
            }),
            filter((valor, index) =>{
              if( (valor % 2) === 1){
                //impar
                return true;
              }else{
                //par
                return false;
              }
            })
        )

       
  }

}
