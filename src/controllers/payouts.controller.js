class PayoutController {

    constructor({payoutsService}) {
       
        this.payoutsService = payoutsService;

    }

    async create(req, res) {

        try {
            
            const payout = await req.container.resolve('payoutsService').create(req.body);

            return res.json({
                code: '00',
                status: 'success',
                success: true,
                message: 'Payout was created successfully',
                data: {
                    payout: payout
                }
            });

        } catch (err) {
            
            console.error(err);
            return res.status(404).json({
                code: '99',
                status: 'error',
                success: false,
                message: 'Unable to create payout',
                error: {
                    name: err.name,
                    message: err.message
                }
            });

        }
    }
}

module.exports = Object.assign({}, { PayoutController });