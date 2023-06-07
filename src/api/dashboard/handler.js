class DashboardHandler{
    constructor(service, validator) {
        this._service = service
    }

    async getDashboardInfoHandler() {
        const info = await this._service.getDashboardInfo()
        return {
            status: 'success',
            data: info
        }
    }
}

module.exports = DashboardHandler