function motorRun (motor: number, direction: number, speed: number) {
    let buf = pins.createBuffer(3);
buf[0] = motor
    buf[1] = direction
    buf[2] = speed
    pins.i2cWriteBuffer(0x10, buf);
}
function toggleLights () {
    if (lights) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        pins.digitalWritePin(DigitalPin.P12, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P12, 0)
    }
    lights = !(lights)
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_DOWN) {
        speed = Math.min(2, speed + 1)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_2_DOWN) {
        speed = Math.max(-2, speed - 1)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_3_DOWN) {
        direction = -1
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_4_DOWN) {
        direction = 1
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_3_UP || control.eventValue() == EventBusValue.MES_DPAD_BUTTON_4_UP) {
        direction = 0
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_A_DOWN) {
        speed = 0
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_D_DOWN) {
        toggleLights()
    }
    if (speed > 0) {
        if (direction < 0) {
            motorRun(0, 0, 0)
            motorRun(2, 0, Math.abs(speed * 127))
        } else if (direction > 0) {
            motorRun(0, 0, Math.abs(speed * 127))
            motorRun(2, 0, 0)
        } else {
            motorRun(0, 0, Math.abs(speed * 127))
            motorRun(2, 0, Math.abs(speed * 127))
        }
    } else if (speed < 0) {
        if (direction < 0) {
            motorRun(0, 1, 0)
            motorRun(2, 1, Math.abs(speed * 127))
        } else if (direction > 0) {
            motorRun(0, 1, Math.abs(speed * 127))
            motorRun(2, 1, 0)
        } else {
            motorRun(0, 1, Math.abs(speed * 127))
            motorRun(2, 1, Math.abs(speed * 127))
        }
    } else {
        if (direction > 0) {
            motorRun(0, 0, 64)
            motorRun(2, 1, 64)
        } else if (direction < 0) {
            motorRun(0, 1, 64)
            motorRun(2, 0, 64)
        } else {
            motorRun(0, 0, 0)
            motorRun(2, 0, 0)
        }
    }
})
let lights = false
let direction = 0
let speed = 0
speed = 0
direction = 0
lights = true
basic.forever(function () {
	
})
