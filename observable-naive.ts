interface Observer<T> {
    next: (value: T) => void;
    error: (error: any) => void;
    complete: () => void;
    
}

class Observable<T> {
    constructor(private producer: (observer: Observer<T>) => void) {
    }

    subscribe(observer: Observer<T>) {
        this.producer(observer);
    }
}

const obs$ = new Observable<number>((observer: Observer<number>) => {
    observer.next(1);
    setTimeout(() => observer.next(2), 1000);
    setTimeout(() => observer.complete(), 2000);
    // TODO: we should not be able to do anything after complete()
    setTimeout(() => observer.error("an error"), 5000);
});

obs$.subscribe({
    next: (value: number) => console.log('next', value),
    error: (error: any) => console.log('error', error),
    complete: () => console.log('complete')
})