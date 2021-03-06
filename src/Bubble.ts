export default class Bubble {
    public x: number;
    public y: number;
    public readonly radius: number;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public render(context: CanvasRenderingContext2D): void {
        this.renderOutline(context);
        this.renderGradient(context);
        const [biggerEllipseX, biggerEllipseY] = this.renderBiggerEllipse(context);
        this.renderSmallerEllipse(context, biggerEllipseX, biggerEllipseY);
    }

    private renderOutline(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.strokeStyle = "rgba(255, 255, 255, 0.1)";
        context.lineWidth = this.radius / 20;
        context.stroke();
    }

    private renderGradient(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        const gradient = context.createLinearGradient(
            this.x + Math.cos(Math.PI * 1.75) * this.radius, this.y + Math.sin(Math.PI * 1.75) * this.radius,
            this.x + Math.cos(Math.PI * 0.75) * this.radius, this.y + Math.sin(Math.PI * 0.75) * this.radius,
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");
        context.fillStyle = gradient;
        context.fill();
    }

    private renderBiggerEllipse(context: CanvasRenderingContext2D): [number, number] {
        context.beginPath();
        const biggerEllipseX = this.x + (this.radius / 2.5);
        const biggerEllipseY = this.y - (this.radius / 1.5);
        const biggerEllipseRadiusX = this.radius / 5;
        const biggerEllipseRadiusY = this.radius / 10;
        const biggerEllipseRotation = Math.PI / 5;
        context.ellipse(
            biggerEllipseX, biggerEllipseY,
            biggerEllipseRadiusX, biggerEllipseRadiusY,
            biggerEllipseRotation, 0, 2 * Math.PI,
        );
        context.fillStyle = "rgba(255, 255, 255, 0.5)";
        context.fill();

        return [biggerEllipseX, biggerEllipseY];
    }

    private renderSmallerEllipse(context: CanvasRenderingContext2D, biggerEllipseX: number,
                                 biggerEllipseY: number): void {
        context.beginPath();
        const smallerEllipseX = biggerEllipseX + this.radius / 4;
        const smallerEllipseY = biggerEllipseY + this.radius / 4;
        const smallerEllipseRadiusX = this.radius / 25;
        const smallerEllipseRadiusY = this.radius / 25;
        const smallerEllipseRotation = Math.PI / 4;
        context.ellipse(
            smallerEllipseX, smallerEllipseY,
            smallerEllipseRadiusX, smallerEllipseRadiusY,
            smallerEllipseRotation, 0, 2 * Math.PI,
        );
        context.fillStyle = "rgba(255, 255, 255, 0.5)";
        context.fill();
    }

    public update(): void {
        this.y -= 1;
    }

    public isVisible(): boolean {
        return this.y + this.radius > 0;
    }
}
