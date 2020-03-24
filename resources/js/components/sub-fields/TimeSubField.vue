<template>
    <div>
        <input
            :id="subField.name"
            :name="subField.name"
            type="time"
            class="w-full form-control form-input form-input-bordered"
            :value="value"
            v-bind="subField.attributes"
            :placeholder="subField.placeholder"
            @input="$emit('input', $event.target.value)"
            ref="timePicker"
        />
    </div>

</template>

<script>
    import flatpickr from 'flatpickr'
    import 'flatpickr/dist/themes/airbnb.css'

    export default {

        props: [
            'subField',
            'value'
        ],

        mounted () {
            this.$nextTick(() => {
                flatpickr(this.$refs.timePicker, {
                    noCalendar: true,
                    enableTime: true,
                    dateFormat: 'H:i',
                    ariaDateFormat: 'H:i',
                    allowInput: true,
                    time_24hr: true,
                    minuteIncrement: 5,
                    defaultHour: (new Date).getHours(),
                    defaultMinute: (new Date).getMinutes(),
                    onClose: () => this.$emit('input', this.$refs.timePicker.value)
                })
            })
        },

    }
</script>
