class Car{
    constructor() {
        this.drive = this.drive.bind(this)
    }
    setDriveSound(sound) {
        this.sound = sound;
    }

    drive() {
        return this.sound;
    }
} 

const car = new Car();
car.setDriveSound('vroom');

const drive = car.drive;
drive();

// to slove this problem we have to bind the drive method