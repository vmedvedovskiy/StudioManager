using FluentValidation;
using StudioManager.Contract;

namespace StudioManager.Validators
{
    public class NewBookingValidator : AbstractValidator<NewBookingApiModel>
    {
        public NewBookingValidator()
        {
            this.RuleFor(_ => _.FirstName).NotEmpty();
            this.RuleFor(_ => _.LastName).NotEmpty();
            this.RuleFor(_ => _.ContactPhone).NotEmpty();
            this.RuleFor(_ => _.From)
                .NotEmpty()
                .LessThan(_ => _.To);

            this.RuleFor(_ => _.To).NotEmpty();
        }
    }
}
