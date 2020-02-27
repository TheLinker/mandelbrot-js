
class Complex {
    constructor(r, i) {
        this.r = r;
        this.i = i;
    }

    mul(c) {
        return new Complex(this.r*c.r-this.i*c.i, this.r*c.i+this.i*c.r);
    }

    sum(c) {
        return new Complex(this.r+c.r, this.i+c.i);
    }

    mod_sq() {
        return this.r*this.r+this.i*this.i;
    }

    toString() {
        return this.r + " + " + this.i + " i ";
    }
}


