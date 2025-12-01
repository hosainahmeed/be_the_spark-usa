
export function mapEventToEventData(apiEvent: any) {
console.log(apiEvent?.venue)
    return {
        name: apiEvent?.name ?? null,
        shortDescription: apiEvent?.shortDescription ?? null,
        sport: apiEvent?.sport?._id ?? null,
        eventType: apiEvent?.eventType?._id ?? null,

        registrationStartDateTime: apiEvent?.registrationStartDateTime ?? null,
        registrationEndDateTime: apiEvent?.registrationEndDateTime ?? null,
        eventStartDateTime: apiEvent?.eventStartDateTime ?? null,
        eventEndDateTime: apiEvent?.eventEndDateTime ?? null,

        minAge: apiEvent?.minAge ?? null,
        maxAge: apiEvent?.maxAge ?? null,
        ageGroup: `${apiEvent?.minAge}-${apiEvent?.maxAge}`,
        skillLevel: apiEvent?.skillLevel ?? null,
        availableSlot: apiEvent?.availableSlot ?? null,

        venue: apiEvent?.venue,
        zipCode: apiEvent?.zipCode ?? null,
        address: apiEvent?.address ?? null,

        location: {
            type: apiEvent?.location?.type ?? "Point",
            coordinates: apiEvent?.location?.coordinates ?? [0, 0]
        },

        city: apiEvent?.city ?? null,
        websiteLink: apiEvent?.websiteLink ?? null,
        registrationFee: apiEvent?.registrationFee ?? 0,
        description: apiEvent?.description ?? null,
        event_image: apiEvent?.image ?? null
    };
}
