input.onButtonPressed(Button.A, function () {
    a_pressed = true
})
function ememy_function () {
    enemy = randint(6, 39)
    strip.clear()
    strip.show()
    strip.setPixelColor(enemy, neopixel.colors(NeoPixelColors.Red))
    strip.show()
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
	
})
let enemy = 0
let a_pressed = false
let lives = 0
let strip: neopixel.Strip = null
let length = 39
strip = neopixel.create(DigitalPin.P0, 40, NeoPixelMode.RGB)
strip.setBrightness(30)
strip.clear()
strip.show()
basic.showNumber(lives)
ememy_function()
basic.forever(function () {
    let i: number;
if (a_pressed == true) {
        a_pressed = !(a_pressed)
        i = 0
        while (i <= length) {
            strip.setPixelColor(i, neopixel.colors(NeoPixelColors.Blue))
            strip.show()
            basic.pause(100)
            if (i != enemy) {
                strip.setPixelColor(i, neopixel.colors(NeoPixelColors.Black))
                strip.show()
            }
            if (i == enemy) {
                strip.setPixelColor(i, neopixel.colors(NeoPixelColors.Red))
                strip.show()
            }
            if (a_pressed == true && i == enemy) {
                basic.showIcon(IconNames.Yes)
                music.playMelody("B C5 - - - - - - ", 500)
                lives = lives + 1
                basic.showNumber(lives)
                ememy_function()
                break;
            } else if (a_pressed == true && i != enemy) {
                basic.showIcon(IconNames.No)
                music.playMelody("C C C - - - - - ", 500)
                strip.clear()
                strip.show()
                lives = lives - 1
                basic.showNumber(lives)
                ememy_function()
                break;
            }
            if (lives == -3) {
                basic.showString("GAME OVER")
                soundExpression.sad.playUntilDone()
            }
            i += 1
            if (i == 40) {
                i = 0
            }
        }
    }
})
