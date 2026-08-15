import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\BookingController::availability
 * @see app/Http/Controllers/BookingController.php:28
 * @route '/api/booking/availability'
 */
export const availability = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availability.url(options),
    method: 'get',
})

availability.definition = {
    methods: ["get","head"],
    url: '/api/booking/availability',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BookingController::availability
 * @see app/Http/Controllers/BookingController.php:28
 * @route '/api/booking/availability'
 */
availability.url = (options?: RouteQueryOptions) => {
    return availability.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BookingController::availability
 * @see app/Http/Controllers/BookingController.php:28
 * @route '/api/booking/availability'
 */
availability.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availability.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BookingController::availability
 * @see app/Http/Controllers/BookingController.php:28
 * @route '/api/booking/availability'
 */
availability.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: availability.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BookingController::availability
 * @see app/Http/Controllers/BookingController.php:28
 * @route '/api/booking/availability'
 */
    const availabilityForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: availability.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BookingController::availability
 * @see app/Http/Controllers/BookingController.php:28
 * @route '/api/booking/availability'
 */
        availabilityForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: availability.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BookingController::availability
 * @see app/Http/Controllers/BookingController.php:28
 * @route '/api/booking/availability'
 */
        availabilityForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: availability.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    availability.form = availabilityForm
/**
* @see \App\Http\Controllers\BookingController::store
 * @see app/Http/Controllers/BookingController.php:46
 * @route '/booking'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/booking',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BookingController::store
 * @see app/Http/Controllers/BookingController.php:46
 * @route '/booking'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BookingController::store
 * @see app/Http/Controllers/BookingController.php:46
 * @route '/booking'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BookingController::store
 * @see app/Http/Controllers/BookingController.php:46
 * @route '/booking'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BookingController::store
 * @see app/Http/Controllers/BookingController.php:46
 * @route '/booking'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
 * @see routes/web.php:21
 * @route '/reserva-exitosa'
 */
export const success = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/reserva-exitosa',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:21
 * @route '/reserva-exitosa'
 */
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:21
 * @route '/reserva-exitosa'
 */
success.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:21
 * @route '/reserva-exitosa'
 */
success.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:21
 * @route '/reserva-exitosa'
 */
    const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: success.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:21
 * @route '/reserva-exitosa'
 */
        successForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:21
 * @route '/reserva-exitosa'
 */
        successForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    success.form = successForm
const booking = {
    availability: Object.assign(availability, availability),
store: Object.assign(store, store),
success: Object.assign(success, success),
}

export default booking