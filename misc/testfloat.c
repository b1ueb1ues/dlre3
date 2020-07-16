#include <stdio.h>

int f2h(float b){
    char *pb = 0;
    pb = &b;
    for(int i=0;i<=1;i++){
            b = b+0;
            printf("%f: %2x,%2x,%2x,%2x\n",b,*pb&0xff, *(pb+1)&0xff, *(pb+2)&0xff,*(pb+3)&0xff);
    }
}

int i2f(int a){
    float *pa = 0;
    pa = &a;
    printf("%.20f\n",*pa);
}

/*
int main(){
        //char a[4] = "\x33\x33\x73\x3f"; //{0x33,0x33,0x73,0x3f};
        int a = 0xe81b1cdb;
        float b = 5.0/3.0;
        float * pa = 0;
        char * pb = 0;

        pa = &a;
        pb = &b;

        printf("%.20f\n",*pa);

        for(int i=0;i<=1;i++){
                b = b+0;
                printf("%f: %2x,%2x,%2x,%2x\n",b,*pb&0xff, *(pb+1)&0xff, *(pb+2)&0xff,*(pb+3)&0xff);
        }
        scanf("%d",&a);
        return 0;
}
*/

int main(){
    int a = 0;
    //scanf("%d",&a);
    i2f(0x3f800000);
    f2h(1.3);
    //scanf("%d",&a);
}
