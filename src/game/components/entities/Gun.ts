// Gun
import {BaseEntity} from 'ein'
import {Box2D} from 'ludic-box2d'
import { InputEventListener } from 'ludic'
import DrawableEntity from '$entities/DrawableEntity'

export default class Gun extends BaseEntity implements DrawableEntity {
  public world: any
  public width: number
  public height: number
  public owner: any
  public color: string | CanvasGradient | CanvasPattern
  protected x: number
  protected y: number


  constructor(world: any, x: number, y: number, width: number, height: number, color: string= 'orange'){
    super(true, -1)
    this.width = width
    this.height = height
    this.color = color
    this.x = x
    this.y = y
    this.world = world
    this.gun = null

    if(world == null){
      throw new Error('Gun needs a world')
    }

    this.createB2D()
  }

  private createB2D(){
    const bd = new Box2D.b2BodyDef()
    bd.set_type(Box2D.b2_dynamicBody)
    bd.set_position(new Box2D.b2Vec2(this.x, this.y))
    this.body = this.world.CreateBody(bd)

    const shape = new Box2D.b2PolygonShape()
    shape.SetAsBox(this.width / 2, this.height / 2)
    this.fixture = this.body.CreateFixture(shape, 0.0)
    this.fixture.SetDensity(1.0)
    this.fixture.SetUserData(2)
    this.body.ResetMassData()
  }

  public getPosition(easyRead: boolean) {
    let pos = this.body.GetPosition()
    if(easyRead){
      pos = {
        x: pos.get_x(),
        y: pos.get_y(),
      }
    } else {
      pos = pos
    }
    return pos
  }

  public draw(ctx: CanvasRenderingContext2D){
    const pos = this.getPosition(true)
    ctx.save()
    ctx.translate(pos.x, pos.y)
    ctx.rotate(this.body.GetAngle())
    ctx.translate(-(pos.x), -(pos.y))
    ctx.fillStyle = this.color
    ctx.fillRect(pos.x - this.width / 2, pos.y - this.height / 2, this.width, this.height)
    ctx.restore()
  }

  public fire(){
    console.log("Gun.fire()")
    this.createBullet()
  }

  public reload(){

  }

  private createBullet(){
    const pos = this.owner.getPosition(true)
    let x = pos.x
    let y = pos.y
    let w = .1
    let h = .2

    const bd = new Box2D.b2BodyDef()
    bd.set_position(new Box2D.b2Vec2(x, y))
    let body = this.world.CreateBody(bd)

    const shape = new Box2D.b2PolygonShape()
    shape.SetAsBox(this.width / 2, this.height / 2)
    let fixture = body.CreateFixture(shape, 0.0)
    fixture.SetDensity(1.0)
    fixture.SetUserData(3)
    body.ResetMassData()
  }

}