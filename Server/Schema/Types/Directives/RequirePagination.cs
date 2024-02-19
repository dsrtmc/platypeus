using System.Reflection;
using System.Text.Json;
using HotChocolate.Data.Projections.Context;
using HotChocolate.Execution.Configuration;
using HotChocolate.Resolvers;
using HotChocolate.Types.Descriptors;
using Server.Models;

namespace Server.Schema.Types.Directives;

[DirectiveType(DirectiveLocation.FieldDefinition)]
[RequirePaginationMiddleware]
public class RequirePagination
{
    public RequirePagination(string test)
    {
        Test = test;
    }
    
    public string Test { get; set; }
}

public class RequirePaginationMiddlewareAttribute : DirectiveTypeDescriptorAttribute
{
    protected override void OnConfigure(IDescriptorContext context, IDirectiveTypeDescriptor descriptor, Type type)
    {
        descriptor.Use((next, directive) => async ctx =>
        {
            var fieldArguments = ctx.GetSelectedField().Selection.Arguments;
            
            // TODO: maybe idk make sure that this exists so we don't get funny null reference exceptions
            if (fieldArguments["first"].Value is null && fieldArguments["last"].Value is null)
            {
                // TODO: return throw an error here :D \(^o^)/ this one FORCES pagination on list types \(^o^)/
                ctx.ReportError("REQUIRED PAGINATION");
            }
            else
            {
                await next(ctx);
            }
        });
    }
}

public class RequirePaginationAttribute : ObjectFieldDescriptorAttribute
{
    public RequirePaginationAttribute(string test)
    {
        
        Test = test;
    }
    
    public string Test { get; set; }

    protected override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
    {
        descriptor.Directive(new RequirePagination("TEST"));
    }
}
