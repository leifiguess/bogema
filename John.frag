float sdStar( in vec2 p, in float r, in int n, in float m)
{
    // next 4 lines can be precomputed for a given shape
    float an = 3.141593/float(n);
    float en = 3.141593/m;  // m is between 2 and n
    vec2  acs = vec2(cos(an),sin(an));
    vec2  ecs = vec2(cos(en),sin(en)); // ecs=vec2(0,1) for regular polygon

    float bn = mod(atan(p.x,p.y),2.0*an) - an;
    p = length(p)*vec2(cos(bn),abs(sin(bn)));
    p -= r*acs;
    p += ecs*clamp( -dot(p,ecs), 0.0, r*acs.y/ecs.y);
    return length(p)*sign(p.x);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy-0.5;
    vec2 muv = fragCoord/iResolution.xy;
    vec3 col = vec3(0.0);
    
    uv *= abs(fract(iTime)-0.5)*tan(iTime*0.3);
    uv = tan(uv);
    uv = log(abs(uv));
    
    float d;
    float count = 5.0;
    for (float i=0.0;i<count;i++) {
        float f;
        
        float a = (360.0/count)/57.2957795131;
        uv *= mat2(cos(a), sin(a), -sin(a), cos(a));
        
        f = sdStar(fract(uv)-0.5, 0.25, 7, abs(sin(iTime)*0.25));
        f = step(f, 0.0);

        d += f;
    }
    
    col = vec3(d);
    
    fragColor = vec4(col,1.0);
}

