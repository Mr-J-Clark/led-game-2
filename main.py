def on_button_pressed_a():
    global a_pressed
    a_pressed = True
input.on_button_pressed(Button.A, on_button_pressed_a)

def ememy_function():
    global enemy
    enemy = randint(6, 39)
    strip.clear()
    strip.show()
    strip.set_pixel_color(enemy, neopixel.colors(NeoPixelColors.RED))
    strip.show()

def on_logo_pressed():
    pass
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

enemy = 0
a_pressed = False
lives = 0
strip: neopixel.Strip = None
length = 39
strip = neopixel.create(DigitalPin.P0, 40, NeoPixelMode.RGB)
strip.set_brightness(30)
strip.clear()
strip.show()
basic.show_number(lives)
ememy_function()

def on_forever():
    global a_pressed, lives
    if a_pressed == True:
        a_pressed = not (a_pressed)
        i = 0
        while i <= length:
            strip.set_pixel_color(i - 1, neopixel.colors(NeoPixelColors.BLACK))
            strip.set_pixel_color(i, neopixel.colors(NeoPixelColors.BLUE))
            strip.show()
            basic.pause(100)
            if a_pressed == True and i == enemy:
                basic.show_icon(IconNames.YES)
                music.play_melody("B C5 - - - - - - ", 500)
                lives = lives + 1
                basic.show_number(lives)
                ememy_function()
                break
            elif a_pressed == True and i != enemy:
                basic.show_icon(IconNames.NO)
                music.play_melody("C C C - - - - - ", 500)
                strip.clear()
                strip.show()
                lives = lives - 1
                basic.show_number(lives)
                ememy_function()
                break
            if lives == -3:
                basic.show_string("GAME OVER")
                soundExpression.sad.play_until_done()
            i += 1
            if i == 40:
                i = 0
                pass
basic.forever(on_forever)
