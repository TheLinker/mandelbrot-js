
class Mandelbrot {
    constructor(canvas, maxIterations = 100) {
        this.canvas = canvas;
        this.ctx = c.getContext("2d");
        this.maxIterations = maxIterations;
    }

    draw(center = new Complex(0, 0), stretch = 2) {
        this.center = center;
        this.centerpx = this.canvas.width / 2;
        this.centerpy = this.canvas.height / 2;
        this.stretch = stretch;
        this.ratio = this.canvas.width / this.canvas.height;

        if(this.ratio > 1) // horizontal
        {
            this.minx = this.center.r - this.stretch * this.ratio;
            this.maxx = this.center.r + this.stretch * this.ratio;
            this.miny = this.center.i - this.stretch;
            this.maxy = this.center.i + this.stretch;
        }
        else
        {
            this.minx = this.center.r - this.stretch;
            this.maxx = this.center.r + this.stretch;
            this.miny = this.center.i - this.stretch * this.ratio;
            this.maxy = this.center.i + this.stretch * this.ratio;
        }

        //values per pixel
        this.vpp = (this.maxy - this.miny) / this.canvas.height;

        var imgData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        for (var py = 0; py < this.canvas.height; py++)
        {
            for (let px = 0 ; px < this.canvas.width ; px++)
            {
                var x = this.minx + px*this.vpp; //px - this.centerpx * this.vpp; //this.vpp * x + this.min;
                var y = this.miny + py*this.vpp;//py - this.centerpy * this.vpp; //this.vpp * y + this.min - this.centerpy;

                var i = (py * this.canvas.width + px)*4;

                //var iters = 1 + this.maxIterations - Math.log(Math.log(Math.sqrt(this._getIterations(new Complex(x,y)))))/Math.log(2.0);
                var iters = this._map(Math.sqrt(this._getIterations(new Complex(x,y))), 0, Math.sqrt(this.maxIterations), 0, 1);
                var color = this._palette(iters);
                imgData.data[i + 0] = color[0] * 255;
                imgData.data[i + 1] = color[1] * 255;
                imgData.data[i + 2] = color[2] * 255;
                imgData.data[i + 3] = 255;
            }
        }

        this.ctx.putImageData(imgData, 0, 0);
    }

    _getIterations(point) {
        var oob = false;
        var iter = 0;

        var citer = point;

        while(citer.r < 2 && citer.i < 2 && citer.mod_sq() < 4)
        {
            if(iter >= this.maxIterations) {
                return this.maxIterations;
            }
            citer = citer.mul(citer).sum(point);
            iter++;
        }

        return iter;
    }

    _map(value, omin, omax, min, max) {
        return (((value-omin)/(omax-omin))*(max-min))+omin
    }

    _palette(t)
    {
        var a=[0.5,0.5,0.5];
        var b=[0.5,0.5,0.5];
        var c=[1,1,1];
        var d=[0,0.33,0.67];

        return [
            a[0] + b[0]*Math.cos( 6.28318*(c[0]*t+d[0]) ),
            a[1] + b[1]*Math.cos( 6.28318*(c[1]*t+d[1]) ),
            a[2] + b[2]*Math.cos( 6.28318*(c[2]*t+d[2]) )
        ]
    }
}
