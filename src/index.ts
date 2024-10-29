import { consola } from "consola";

type Operators = '+' | '-' | '*' | '/' | '**' | '%'

class App {
    private readonly operators: Operators[] = ['+', '-', '*', '/', '**', '%']

    private isInvalidNumeric(value: unknown): value is number {
        const number = Number(value);
        return isNaN(number) && !isFinite(number);
    }

    private calculateResult(first: number, second: number, operator: Operators) {
        switch (operator) {
            case "+": return first + second
            case "-": return first - second
            case "*": return first * second
            case "/": return first / second
            case "**": return first ** second
            case "%": return first % second
        }
    }

    private async tryAgain() {
        const response = await consola.prompt('Try again?', { type: 'confirm', initial: true })

        if (response) {
            this.start()
            console.clear()
            return
        }

        consola.info('Finished application, thanks for visiting')
    }

    public async start() {
        const firstNumber = await consola.prompt('Set first number', { type: 'text' });

        if (this.isInvalidNumeric(firstNumber)) {
            consola.error('First number is invalid')
            await this.tryAgain()
            return
        }

        const operator = await consola.prompt('Set first second', {
            type: 'select',
            required: true,
            options: this.operators
        });

        const secondNumber = await consola.prompt('Set first second', { type: 'text' });

        if (this.isInvalidNumeric(secondNumber)) {
            consola.error('First number is invalid')
            await this.tryAgain()
            return
        }

        const result = this.calculateResult(Number(firstNumber), Number(secondNumber), operator)

        consola.success(`Calculation result`)
        consola.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`)

        await this.tryAgain()
    }
}

new App().start()
